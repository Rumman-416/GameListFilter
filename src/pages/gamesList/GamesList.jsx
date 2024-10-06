import React, { useEffect, useRef, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import moment from "moment";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const GamesList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const timeoutRef = useRef(null);
  const url = "https://spa.api.logicloop.io/api/games";
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const minRatings = searchParams.get("minRatings") || 0;
  const maxRatings = searchParams.get("maxRatings") || 100;
  const page = parseInt(searchParams.get("page")) || 1;
  const pageSize = parseInt(searchParams.get("pageSize")) || 10;
  const orderBy = searchParams.get("orderBy") || "rating";
  const orderDirection = searchParams.get("orderDirection") || "desc";


  const handleOrderDirectionChange = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      orderDirection: orderDirection === "asc" ? "desc" : "asc",
    });
  };

  const handleOrderByChange = (value) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      orderBy: value,
      orderDirection: value === "firstReleaseDate" || value === "rating" ? "desc" : "asc",
    });
  };

  const handleFilterChange = (field, value) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      [field]: value,
    });
  };

  const params = {
    filters: {
      name: {
        $containsi: search,
      },
      rating: {
        $between: [minRatings, maxRatings],
      },
    },
    sort: {
      [orderBy]: orderDirection,
    },
    pagination: {
      page,
      pageSize,
    },
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url, { params });
      setData(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) {
      setLoading(true);
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      fetchData();
    }, 2000);
  }, [search, minRatings, maxRatings, orderBy, orderDirection, page]);

  return (
    <>
      <div className="px-4 font-montserrat flex flex-col gap-5 md:gap-10 lg:flex-row lg:w-full">
        <div className="p-5 md:px-10 bg-card lg:h-[340px] lg:sticky top-10 lg:w-[25%]">
          <h2 className="capitalize text-xl">Filter Results</h2>
          <div className="text-sm my-4">
            <label>Name </label>
            <input
              type="text"
              placeholder="Enter Game Name "
              value={search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full bg-input p-1 focus:outline-none"
            />
          </div>
          <div className="md:flex md:items-center md:justify-between md:gap-6 lg:block">
            <div className="text-sm my-4 md:flex md:flex-col">
              <label>Minimum Score</label>
              <div className="bg-input p-1 flex">
                <input
                  type="number"
                  placeholder="1"
                  value={minRatings}
                  onChange={(e) => handleFilterChange("minRatings", e.target.value)}
                  className="bg-input p-1 focus:outline-none w-10"
                />{" "}
                _{"   "}
                <input
                  type="number"
                  placeholder="10"
                  value={maxRatings}
                  onChange={(e) => handleFilterChange("maxRatings", e.target.value)}
                  className="bg-input p-1 focus:outline-none w-20 md:w-full"
                />
              </div>
            </div>
            <div className="text-sm my-4 md:w-full">
              <label>Order By</label>
              <div className="flex">
                <div
                  className="bg-button cursor-pointer p-2 flex justify-center items-center"
                  onClick={handleOrderDirectionChange}
                >
                  <FaArrowUp
                    className={`text-lg ${orderDirection === "asc" ? "rotate-180" : ""}`}
                  />
                </div>
                <select
                  className="bg-input flex justify-between items-center w-full px-1 focus:outline-none"
                  value={orderBy}
                  onChange={(e) => handleOrderByChange(e.target.value)}
                >
                  <option value="firstReleaseDate">Release Date</option>
                  <option value="rating">Score</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
            <div className="mt-4 md:mt-5">
              <button
                className="bg-button w-full p-1 md:px-3 md:py-[3px] rounded-sm"
                onClick={() => setSearchParams({})} 
              >
                clear
              </button>
            </div>
          </div>
        </div>
        <div className="text-text lg:w-[75%]">
          {loading ? (
            <div className="w-full">Loading...</div>
          ) : error ? (
            <p>Error: {error}</p>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row md:w-full">
                <div className="bg-[#03080f] h-[120px] p-4 w-full flex justify-end md:w-[10%] md:h-[130px] md:mb-4">
                  <div className="block md:hidden">
                    <span className="bg-button rounded-full p-1 relative right-0">
                      {item.attributes.rating}
                    </span>
                  </div>
                </div>
                <div className="p-5 md:px-10 bg-card md:w-[90%] md:mb-4 md:h-[130px] md:flex justify-between items-center">
                  <div>
                    <p className="text-[#fff] text-lg font-medium">
                      {item.attributes.name}
                    </p>
                    <p className="text-[10px] mb-4">
                      Release Date:{" "}
                      {moment(item.attributes.firstReleaseDate).format("DD-MM-YYYY")}
                    </p>
                    <p className="font-mulish text-[10px]">
                      {item.attributes.summary
                        ? item.attributes.summary.slice(0, 250) + " ..."
                        : ""}
                    </p>
                  </div>
                  <div className="md:block hidden">
                    <span className="bg-button rounded-full p-1 relative right-0">
                      {item.attributes.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No game found</p>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-5 items-center pr-5 pb-4 mt-4 lg:mt-0">
        <button
          className="bg-button p-1"
          onClick={() => setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: page - 1 })}
          disabled={page === 1}
        >
          <MdOutlineKeyboardArrowLeft className="text-2xl" />
        </button>
        <span>{page}</span>
        <button
          className="bg-button p-1"
          onClick={() => setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: page + 1 })}
        >
          <MdOutlineKeyboardArrowRight className="text-2xl" />
        </button>
      </div>
    </>
  );
};

export default GamesList;
