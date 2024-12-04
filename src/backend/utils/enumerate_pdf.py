import pymupdf
import utils as constants
import sys

def enumeratePDF(filename, start=0, number=1, output="enumerated.pdf"):
    font = "helv"
    size = 11
    rotate = 0

    p = pymupdf.Point(15, 22)
    doc = pymupdf.open(filename)

    for page_index in range(start - 1, len(doc)):
        page = doc[page_index]
        rc = page.insert_text(p,
                f'{number}',
                fontname = font,
                fontsize = size,
                rotate = rotate,
            )
        number += 1

    doc.save(f'./output/{output}')
    return f'./output/{output}'