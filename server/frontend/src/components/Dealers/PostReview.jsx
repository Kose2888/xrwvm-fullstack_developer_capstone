import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
/* import "./Dealers.css"; */
import "./PostReview.css";
import "../assets/style.css";
import Header from '../Header/Header';


const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState();
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("postreview"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let review_url = root_url + `djangoapp/add_review`;
  let carmodels_url = root_url + `djangoapp/get_cars`;

  const postreview = async () => {
    let name = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
    //If the first and second name are stores as null, use the username
    if (name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if (!model || review === "" || date === "" || year === "" || model === "") {
      alert("All details are mandatory")
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });

    console.log(jsoninput);
    const res = await fetch(review_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsoninput,
    });

    const json = await res.json();
    if (json.status === 200) {
      window.location.href = window.location.origin + "/dealer/" + id;
    }

  }
  const get_dealer = useCallback(async () => {
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();

    if (retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer)
      if (dealerobjs.length > 0)
        setDealer(dealerobjs[0])
    }
  }, [dealer_url])

  const get_cars = useCallback(async () => {
    const res = await fetch(carmodels_url, {
      method: "GET"
    });
    const retobj = await res.json();

    let carmodelsarr = Array.from(retobj.CarModels)
    setCarmodels(carmodelsarr)
  }, [carmodels_url])

  useEffect(() => {
    get_dealer();
    get_cars();
  }, [get_dealer, get_cars]);

  return (
    <div className='container_postreview'>
      <Header />
      <div className='review_form_card'>
        <h1 style={{ color: "darkblue", textAlign: "center", marginBottom: "30px" }}>
          {dealer.full_name}
        </h1>

        <div className='input_field'>
          <label htmlFor="review">Your Review</label>
          <textarea
            id='review'
            placeholder="Write your experience..."
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>

        <div className='input_field'>
          <label htmlFor="purchase_date">Purchase Date</label>
          <input
            id="purchase_date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className='input_field'>
          <label htmlFor="cars">Car Make & Model</label>
          <select name="cars" id="cars" onChange={(e) => setModel(e.target.value)}>
            <option value="" selected disabled hidden>Choose Car Make and Model</option>
            {carmodels.map(carmodel => (
              <option key={carmodel.id} value={carmodel.CarMake + " " + carmodel.CarModel}>
                {carmodel.CarMake} {carmodel.CarModel}
              </option>
            ))}
          </select>
        </div>

        <div className='input_field'>
          <label htmlFor="car_year">Car Year</label>
          <input
            id="car_year"
            type="number"
            placeholder="e.g. 2023"
            onChange={(e) => setYear(e.target.value)}
            max={2023}
            min={2015}
          />
        </div>

        <button className='postreview' onClick={postreview}>
          Post Review
        </button>
      </div>
    </div>
  );
}
export default PostReview
