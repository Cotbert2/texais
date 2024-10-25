import pymupdf
import utils as constants
import sys

def main():
    options = {
        "--help": "Type <filename> <watermark-image> --output <output-filename>",
        "--version": constants.Version
    }
    args = sys.argv[1:]
    argsToRemove = []
    output = "watermarked.pdf"

    if len(args) < 1:
        print("Please provide valid arguments, type --help for more information")
        sys.exit(0)


    for arg in args:
        if arg == "--output":
            output = f'{args[args.index(arg) + 1]}'

        for option in options:
            if arg == option:
                print(options[option])
                sys.exit(0)

    for arg in args:
        if arg.startswith("--"):
            argsToRemove.append(args[args.index(arg) + 1])
            argsToRemove.append(arg)
    for arg in argsToRemove:
        args.remove(arg)
    
    file = args[0]
    watermark = args[1]

    if not file.endswith(".pdf"):
        print("Please provide only pdf files")
        sys.exit(0)

    doc = pymupdf.open(file)

    for page_index in range(len(doc)):
        page = doc[page_index]
        page.insert_image(page.bound(), filename=watermark, overlay=True)

    doc.save(f'output/{output}')
    print(f"Watermark saved as {output}")

if __name__ == "__main__":
    main()