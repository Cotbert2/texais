import pymupdf
import sys
import utils

def main():
    options = {
    "--help": """
    Type --file <path_to_file> --output <filename> --passwd <password> to protect the pdf
    flags:
        -b: lock the pdf
        -u: unlock the pdf
    """,
    "--version": utils.Version
    }

    args = sys.argv[1:]
    output = "blocked.pdf"
    passwd = ""
    file = ""
    should_block = False

    if len(args) == 0:
        print("Please provide a pdf file")
        sys.exit(0)

    for arg in args:
        if arg == "--output":
            output = f"{args[args.index(arg) + 1]}"
        if arg == "--file":
            file = f"{args[args.index(arg) + 1]}"

        if arg == "--passwd":
            passwd = f"{args[args.index(arg) + 1]}"

        if arg == "-b":
            should_block = True

        for option in options:
            if arg == option:
                print(options[option])
                sys.exit(0)

    if file == "" or passwd == "":
        print("Please provide a file and a password to protect the pdf")
        sys.exit(0)

    if not utils.validatePathPdf(file):
        print("file input does not exist")
        sys.exit(0)

    if should_block:
        protect_pdf(file, passwd, output)
    else:
        unblock_pdf(file, passwd, output)



def protect_pdf(filename, password, output_filename):
    original_document = pymupdf.open(filename=filename)
    original_document.save(filename=f"./output/{output_filename}",owner_pw=password,
                            user_pw=password, encryption=pymupdf.PDF_ENCRYPT_AES_256)


def unblock_pdf(filename, password, output_filename):
    original_document = pymupdf.open(filename=filename)

    if not original_document.needs_pass:
        print("The document is not password protected")
        sys.exit(0)

    auth = original_document.authenticate(password=password)
    if auth not in (1 , 4 , 6):
        print("The password is incorrect")
        sys.exit(0)

    original_document.save(f"./output/{output_filename}", encryption=pymupdf.PDF_ENCRYPT_NONE)


if __name__ == "__main__":
    main()