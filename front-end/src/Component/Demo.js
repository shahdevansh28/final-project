import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Demo() {
  const [details, setDetail] = useState([]);
  const [cookie, setCookie] = useCookies(['user']);
  useEffect(() => {
    axios
      .get("https://localhost:44397/api/get-all-booking", {
        headers: { Authorization: "Bearer " + cookie.token },
      })
      .then((response) => {
        console.log(response.data);
        setDetail(response.data);
      });
  }, []);

  return (
    <>
      <h1>{}</h1>
    </>
  );
}
