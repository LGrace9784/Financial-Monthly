# This is the area where we will export the information into pdf or excel

import pandas as pd
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

# Excel export function
def generate_excel(data: dict, filename="report.xlsx"):
    df = pd.DataFrame([data])
    path = f"/tmp/{filename}"
    df.to_excel(path, index=False)
    return path

# PDF export function
def generate_pdf(data: dict, filename="report.pdf"):
    path = f"/tmp/{filename}"
    doc = SimpleDocTemplate(path)

    styles = getSampleStyleSheet()
    content = []

    for key, value in data.items():
        content.append(Paragraph(f"<b>{key}</b>: {value}", styles["Normal"]))

        doc.build(content)
        return path