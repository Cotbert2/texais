from zipfile import ZipFile


def zip_files(files_paths, zip_path):

    zip_file = ZipFile(zip_path, 'w')
    for file_path in files_paths:
        zip_file.write(f"./output/{file_path}")
    zip_file.close()
    return zip_path
