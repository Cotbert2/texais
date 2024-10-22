import pymupdf
import sys

def main():
    options = {
        "--help": "Type --output <filename> to specify the output file, and provide many pdf files to merge",
        "--version": "Version 1.0.0"
    }
    args = sys.argv[1:]
    output = "merged.pdf"
    
    if len(args) == 0:
        print("Please provide pdf files")
        sys.exit(0)

    for arg in args:
        if arg == "--output":
            output = f'{args[args.index(arg) + 1]}'
        for option in options:
            if arg == option:
                print(options[option])
                sys.exit(0)
    
    args.remove(args[args.index("--output") + 1])
    args.remove('--output')

    for arg in args:
        if not arg.endswith(".pdf"):
            print("Please provide only pdf files")
            sys.exit(0)

    doc_a = pymupdf.open(args[0])
    
    for arg in args[1::]:
        doc_x = pymupdf.open(arg)
        doc_a.insert_pdf(doc_x)

    doc_a.save(output)

main()