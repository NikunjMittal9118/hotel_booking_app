import "./searchItem.css";
import { Link } from "react-router-dom";
const SearchItem = ({data}) => {
  return (
    <div className="searchItem">
      <img src={data.images[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{data.name}</h1>
        <span className="siDistance">{data.distance} from {data.address}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          {data.description}
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>{data.ratings}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Rs.{data.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={ `/hotels/${data._id}` } >
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
