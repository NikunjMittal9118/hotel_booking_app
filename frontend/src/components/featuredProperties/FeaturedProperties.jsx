import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("http://localhost:9000/api/hotels?featured=true")
  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1",
    "https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159_640.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1",
  ]
  return (
    <div className="fp">
      {
        loading ? "Loading please wait..." :
        <>
          { data && 
            data.map((val,index)=>{
              return(
                <div className="fpItem" key={val._id}>
                  <img src={val.images[0]} alt="" className="fpImg"/>
                  <span className="fpName">{val.name}</span>
                  <span className="fpCity">{val.city}</span>
                  <span className="fpPrice">Rs. {val.cheapestPrice}</span>
                  <div className="fpRating">
                    <button>{val.ratings}</button>
                    <span>{val.description}</span>
                  </div>
                </div>
              )
            })
          }
        </>
      }  
    </div>
  );
};

export default FeaturedProperties;
