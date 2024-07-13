import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://api9.parentune.com/content/v2/dailyfocus", {
      method: "GET",
      headers: {
        accept: "application/json, text/plain, /",
        "accept-language": "en-US,en;q=0.9",
        authtoken:
          "9467c5b4e290227a2a270f4a1ec2a37643b4a5dfd90a993b4e6ceb61ea0d5b5a",
        instanceid:
          "c4b50b993092ab3ed5f35ad684f82b4e6d081a4ed65c49902d80dde82183057a",
        lang: "en",
        origin: "https://www.parentune.com",
        priority: "u=1, i",
        referer: "https://www.parentune.com/",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        userid: "3781928",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProductData(data.data.content[0].data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  return (
    <>
      {isLoading ? (
        <h2 style={{ margin: "auto", width: "300px" }}>Loading.....</h2>
      ) : (
        <div style={{ margin: "auto", width: "300px" }}>
          <h2 style={{ width: "300px" }}>Today's Focus</h2>
          {productData.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "300px",
                  marginBottom: "20px",
                  padding: "15px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={item.thumb}
                    alt={item.thumbType}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "18px",
                      marginRight: "10px",
                    }}
                  >
                    {item.content_type}
                  </h2>
                  <div
                    style={{
                      color: "#666",
                      fontSize: "14px",
                    }}
                  >
                    {item.duration} min read
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.4",
                    marginBottom: "8px",
                  }}
                >
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
