import pymupdf
import sys

def main():
    """
    options = {
        "--help" : "",
        "--version" : "Version 1.0.0"
    }

    args = sys.argv[1:]
    output = ["split_first.pdf", "split_second.pdf"]

    if len(args) == 0:
        print("Please provide a pdf file and a page number to split")
        sys.exit(0)
    """

    page = 1

    original_document = pymupdf.open("./test-files/test.pdf")

    # Split the document into two parts
    second_document = pymupdf.open()

    second_document.insert_pdf(original_document, from_page = page)

    second_document.save("./output/split_second.pdf")

    original_document.delete_pages(from_page = page)

    original_document.save("./output/split_first.pdf")



if __name__ == "__main__":
    main()