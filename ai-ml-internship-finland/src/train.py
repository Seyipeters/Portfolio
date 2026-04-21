from __future__ import annotations

import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.metrics import f1_score, precision_score, recall_score, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier


def build_synthetic_churn_data(n_samples: int = 2400, random_state: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(random_state)

    tenure_months = rng.integers(1, 60, n_samples)
    monthly_spend = rng.normal(48, 14, n_samples).clip(10, 140)
    support_tickets = rng.poisson(1.4, n_samples)
    last_login_days = rng.integers(0, 40, n_samples)
    payment_method = rng.choice(["card", "bank_transfer", "paypal"], n_samples, p=[0.55, 0.25, 0.20])
    region = rng.choice(["Uusimaa", "Pirkanmaa", "Varsinais-Suomi", "Other"], n_samples, p=[0.35, 0.18, 0.17, 0.30])

    raw_score = (
        0.025 * last_login_days
        + 0.55 * (support_tickets > 2).astype(float)
        - 0.02 * tenure_months
        - 0.012 * monthly_spend
        + 0.25 * (payment_method == "paypal").astype(float)
    )
    probability = 1 / (1 + np.exp(-raw_score + 0.8))
    churned = rng.binomial(1, probability)

    return pd.DataFrame(
        {
            "tenure_months": tenure_months,
            "monthly_spend": monthly_spend,
            "support_tickets": support_tickets,
            "last_login_days": last_login_days,
            "payment_method": payment_method,
            "region": region,
            "churned": churned,
        }
    )


def train_and_evaluate() -> dict:
    df = build_synthetic_churn_data()

    X = df.drop(columns=["churned"])
    y = df["churned"]

    numeric_features = ["tenure_months", "monthly_spend", "support_tickets", "last_login_days"]
    categorical_features = ["payment_method", "region"]

    numeric_transformer = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
        ]
    )

    categorical_transformer = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("onehot", OneHotEncoder(handle_unknown="ignore")),
        ]
    )

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, numeric_features),
            ("cat", categorical_transformer, categorical_features),
        ]
    )

    model = RandomForestClassifier(
        n_estimators=260,
        max_depth=9,
        min_samples_leaf=3,
        random_state=42,
        class_weight="balanced",
    )

    pipeline = Pipeline(steps=[("preprocessor", preprocessor), ("model", model)])

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    pipeline.fit(X_train, y_train)
    y_pred = pipeline.predict(X_test)
    y_proba = pipeline.predict_proba(X_test)[:, 1]

    metrics = {
        "roc_auc": round(float(roc_auc_score(y_test, y_proba)), 4),
        "precision": round(float(precision_score(y_test, y_pred)), 4),
        "recall": round(float(recall_score(y_test, y_pred)), 4),
        "f1": round(float(f1_score(y_test, y_pred)), 4),
        "test_size": int(len(y_test)),
    }

    models_dir = Path(__file__).resolve().parent.parent / "models"
    models_dir.mkdir(parents=True, exist_ok=True)

    joblib.dump(pipeline, models_dir / "churn_model.joblib")
    (models_dir / "metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")

    return metrics


if __name__ == "__main__":
    results = train_and_evaluate()
    print("Training complete. Metrics:")
    for key, value in results.items():
        print(f"- {key}: {value}")
