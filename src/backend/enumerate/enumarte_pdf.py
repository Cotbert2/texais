import pymupdf
import utils as constants
import sys

def main():
    options = {
        "--help": '''Type <filename> <...>
                     Use --output <output-filename> to specify the output file
                     Use --start <start-page> to specify the page to start the enumeration
                     Use --end <end-page> to specify the page to end the enumeration
                     Use --number <number> to specify the number to start the enumeration
                     Use --font <font> to specify the font to use
                     Use --size <size> to specify the font size
                     Use --rotate <rotation> to specify the rotation of the text (0, 90, 180, 270)
                     Type --version to get the version of the program
                     ''',
        "--version": constants.Version
    }
    args = sys.argv[1:]
    argsToRemove = []
    output = "enumerated.pdf"
    start = 0
    number = 1
    font = "helv"
    size = 11
    rotate = 0

    if len(args) < 1:
        print("Please provide valid arguments, type --help for more information")
        sys.exit(0)

    for arg in args:
        if arg == "--output":
            output = f'{args[args.index(arg) + 1]}'
        if arg == "--start":
            start = int(args[args.index(arg) + 1])
        if arg == "--number":
            number = int(args[args.index(arg) + 1])
        if arg == "--font":
            font = f'{args[args.index(arg) + 1]}'
        if arg == "--size":
            size = int(args[args.index(arg) + 1])
        if arg == "--rotate":
            rotate = int(args[args.index(arg) + 1])

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

    for arg in args:
        if not arg.endswith(".pdf"):
            print("Please provide only pdf files")
            sys.exit(0)

    p = pymupdf.Point(15, 22)
    doc = pymupdf.open(args[0])

    for page_index in range(start - 1, len(doc)):
        page = doc[page_index]
        rc = page.insert_text(p,
                f'{number}',
                fontname = font,
                fontsize = size,
                rotate = rotate,
            )
        number += 1

    doc.save(f'output/{output}')
    print(f"Enumerated {len(doc) - start} pages")

if __name__ == "__main__":
    main()