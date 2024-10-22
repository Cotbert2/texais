import pymupdf
import utils
import sys

from utils import validatePathPdf

def main():

    options = {
        "--help" : "Type --ouput <filename> --page <page_to_split_document> --file <path_to_file>",
        "--version" : utils.Version
    }

    args = sys.argv[1:]
    output = []
    file = ""

    if len(args) == 0:
        print("Please provide a pdf file and a page number to split")
        sys.exit(0)

    for arg in args:
        if arg == "--output":
            output = [f"{args[args.index(arg) + 1]}_first.pdf", f"{args[args.index(arg) + 1]}_second.pdf"]

        if arg == "--file":
            file = f"{args[args.index(arg) + 1]}"

        if arg == "--page":
            try:
                page = int(args[args.index(arg) + 1])
            except:
                print("Error with the page inserted")
                sys.exit(0)

        for option in options:
            if arg == option:
                print(options[option])
                sys.exit(0)

    if len(output) == 0 or page == "" or file =="":
        print("Please provide full information")
        sys.exit(0)

    if not validatePathPdf(file):
        print("file input does not exist")
        sys.exit(0)

    original_document = pymupdf.open(file)

    if page >= original_document.page_count:
        print("The page deadline is overflow the page number of the document")
        sys.exit(0)

    # Split the document into two parts
    second_document = pymupdf.open()
    second_document.insert_pdf(original_document, from_page = page)
    second_document.save(f"./output/{output[0]}")
    original_document.delete_pages(from_page = page)
    original_document.save(f"./output/{output[1]}")

if __name__ == "__main__":
    main()