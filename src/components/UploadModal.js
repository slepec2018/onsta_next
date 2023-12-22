import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atom/modalAtom";
import Modal from 'react-modal';
import { CameraIcon } from "@heroicons/react/outline";

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);

  function addImageToPost(event) {
    const reader = new FileReader();

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  }

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => {setOpen(false); setSelectedFile(null)}}
          className="max-w-lg w-[90%] h-[300px] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 
          rounded-md shadow-md"
        >
          <div
            className="flex flex-col justify-center items-center h-[100%]"
          >
            {selectedFile ? (
              <img
                src={selectedFile}
                alt="image"
                className="w-full max-h-[250px] object-cover cursor-pointer overflow-hidden"
                onClick={() => setSelectedFile(null)}
              />
            ) : (
              <CameraIcon
                className="cursor-pointer h-14 bg-red-200 p-2 rounded-full border-2 text-red-500"
                onClick={() => filePickerRef.current.click()}
              />
            )}
            <input
              type="file"
              hidden
              ref={filePickerRef}
              onChange={addImageToPost}
            />
            <input
              type="text"
              maxLength="150"
              placeholder="Please enter your caption..."
              className="m-4 border-none text-center w-full focus:ring-0"
            />
            <button
              className="cursor-pointer w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125
              disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
              disabled
            >
              Upload Post
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
