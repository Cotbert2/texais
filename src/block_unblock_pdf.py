import pymupdf
import sys

def main():
    pass

def protect_pdf():
    original_document = pymupdf.open("./test-files/test.pdf")
    original_document.save(filename='./output/blocked.pdf',owner_pw='1234', user_pw='1234', encryption=pymupdf.PDF_ENCRYPT_AES_256)


def unblock_pdf():
    Password = "1234"
    original_document = pymupdf.open("./test-files/blocked.pdf")

    if not original_document.needs_pass:
        print("The document is not password protected")
        sys.exit(0)

    auth = original_document.authenticate(Password)
    if auth not in (1 , 4 , 6):
        print("The password is incorrect")
        sys.exit(0)

    original_document.save("./output/unblocked.pdf", encryption=None)

if __name__ == "__main__":
    unblock_pdf()