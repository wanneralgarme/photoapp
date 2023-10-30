import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function ImageGridFashion() {
  const [page, setPage] = useState(1); // Initialize page state

  const fetchImages = async ({ queryKey }) => {
    const { data } = await axios.get(`http://localhost:8888/${queryKey[0]}?category=fashion&page=${queryKey[1]}`);
    return data;
  };

  // Use React Query to fetch data
  const queryImages1 = useQuery({ queryKey: ["images", page], queryFn: fetchImages });
  const queryImages2 = useQuery({ queryKey: ["images", page + 1], queryFn: fetchImages });
  const queryImages3 = useQuery({ queryKey: ["images", page + 2], queryFn: fetchImages });

  console.log(queryImages1.data);
  console.log(queryImages2.data);
  console.log(queryImages3.data);

  let resultQueryImages1 = queryImages1.data;
  let resultQueryImages2 = queryImages2.data;
  let resultQueryImages3 = queryImages3.data;

  // Combine the data from all three queries
  let allImages = [];
  if (resultQueryImages1 && resultQueryImages2 && resultQueryImages3) {
    allImages = [...resultQueryImages1, ...resultQueryImages2, ...resultQueryImages3];
  }
  //const allImages = [...resultQueryImages1, ...resultQueryImages2, ...resultQueryImages3];

  if (queryImages1.isLoading || queryImages2.isLoading || queryImages3.isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (queryImages1.isError || queryImages2.isError || queryImages3.isError) {
    const errorMessage = queryImages1.isError ? queryImages1.error.message : queryImages2.isError ? queryImages2.error.message : queryImages3.error.message;
    return <div className="container">Error: {errorMessage}</div>;
  }

  //Loop through the images and add a property of id to each image with index as key
  const finalImages = allImages.map((image, index) => {
    image.id = index;
    return image;
  });

  async function downloadImage(imageSrc, nameOfDownload) {
    const response = await fetch(imageSrc);

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = nameOfDownload;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  }

  return (
    <div className="container">
      <div className="row row-cols-3">
        {finalImages.map((image, index) => (
          <div key={index} className="col item-single">
            <img className="image" src={image.url} alt={image.title} />
            <div className="middle">
              <a
                className="btn btn-dark"
                download
                onClick={() => {
                  downloadImage(image.url, image.url.substring(image.url.lastIndexOf("/") + 1));
                }}
              >
                DOWNLOAD
              </a>
            </div>
          </div>
        ))}
      </div>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => setPage(page - 3)} disabled={page === 1}>
              Previous Page
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setPage(page + 3)}>
              Next Page
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ImageGridFashion;
