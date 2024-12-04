import pymupdf

def watermarkPDF(filename, watermark, output="watermarked.pdf"):

    doc = pymupdf.open(filename)

    for page_index in range(len(doc)):
        page = doc[page_index]
        page.insert_image(page.bound(), filename=watermark, overlay=True)

    doc.save(f'./output/{output}')
    return f'./output/{output}'