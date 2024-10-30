import shutil
import os.path



def zipper(folder_path: str, zip_name: str) -> bool:
    archived = shutil.make_archive(zip_name, 'zip', folder_path)
    if os.path.exists(archived):
        return True
    return False
