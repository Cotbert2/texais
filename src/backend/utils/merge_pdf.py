import pymupdf
import utils as constants
import sys

def mergePDF(files, output="merged.pdf"):
    doc_a = pymupdf.open(files[0])

    for f in files[1::]:
        doc_x = pymupdf.open(f)
        doc_a.insert_pdf(doc_x)

    doc_a.save(f'./output/{output}')
    return f'./output/{output}'
