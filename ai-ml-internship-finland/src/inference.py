from __future__ import annotations

from pathlib import Path

import joblib
import pandas as pd


def load_model():
    model_path = Path(__file__).resolve().parent.parent / "models" / "churn_model.joblib"
    if not model_path.exists():
        raise FileNotFoundError("Model not found. Run train.py first.")
    return joblib.load(model_path)


def predict_sample(model) -> None:
    sample = pd.DataFrame(
        [
            {
                "tenure_months": 6,
                "monthly_spend": 29.0,
                "support_tickets": 4,
                "last_login_days": 23,
                "payment_method": "paypal",
                "region": "Uusimaa",
            },
            {
                "tenure_months": 28,
                "monthly_spend": 72.0,
                "support_tickets": 0,
                "last_login_days": 2,
                "payment_method": "card",
                "region": "Pirkanmaa",
            },
        ]
    )

    proba = model.predict_proba(sample)[:, 1]
    pred = model.predict(sample)

    for i, (p, y) in enumerate(zip(proba, pred), start=1):
        label = "high churn risk" if y == 1 else "low churn risk"
        print(f"Sample {i}: {label} (probability={p:.3f})")


if __name__ == "__main__":
    clf = load_model()
    predict_sample(clf)
