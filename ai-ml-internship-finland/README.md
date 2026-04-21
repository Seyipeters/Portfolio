# AI/ML Internship Project (Finland Focus)

## Project: Customer Churn Risk Prediction for a Nordic Subscription App

This project simulates a real-world AI/ML internship task commonly seen in Finland-based roles:
- build a reproducible ML pipeline
- evaluate model quality with business-focused metrics
- package inference for practical use
- document decisions clearly

## Problem Statement
A subscription company wants to identify customers likely to churn so retention teams can intervene early.

## What this project demonstrates
- End-to-end ML workflow (data generation, training, evaluation, artifact saving)
- Clear feature engineering pipeline using `scikit-learn`
- Model performance reporting (AUC, precision, recall, F1)
- Reusable prediction script for new customer records

## Tech Stack
- Python 3.10+
- pandas, numpy
- scikit-learn
- joblib

## Structure
- `src/train.py` – train + evaluate + save model pipeline
- `src/inference.py` – run predictions on new records
- `models/churn_model.joblib` – generated model artifact
- `models/metrics.json` – generated evaluation report

## Run locally
```bash
pip install -r requirements.txt
python src/train.py
python src/inference.py
```

## Example output
`train.py` creates:
- `models/churn_model.joblib`
- `models/metrics.json`

## Why this is internship-relevant
The project mirrors common internship requirements:
- build maintainable ML code
- explain metrics and trade-offs
- support practical deployment paths
- align technical output with business decisions
