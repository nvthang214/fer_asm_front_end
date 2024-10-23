import axios from "axios";

export async function Upload(image) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "thang_214");

    return await axios
        .post(
            `https://api.cloudinary.com/v1_1/dyggjqxhh/image/upload`,
            formData
        )
        .then((response) => {
            return response.data.secure_url;
        });
}
