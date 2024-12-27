import React from 'react';
import { CalendarDays, Tag } from 'lucide-react';
import CloseIcon from '@mui/icons-material/Close';
import api from '../api';

const Entry = ({ props, refresh }) => {
  const removeFromCollection = (e, id) => {
    e.stopPropagation(); // Prevents the event from bubbling up

    const url = "/api/entry/delete/";
    api.delete(url + id)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => alert(err));

    refresh();
    refresh();
    refresh();
    refresh();
  };
  const getSvgPath = (type) => {
    switch (type) {
      case "anime":
        return "/star-fall-2-svgrepo-com.svg";
      case "tv":
        return "/tv-alt-svgrepo-com.svg";
      case "book":
        return "/book-svgrepo-com.svg";
      default:
        return "/controller-svgrepo-com.svg";
    }
  };
  
  return (
    <div className="relative rounded-2xl shadow-2xl w-full h-min bg-[#333333]">
      <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg">
        {props.id}
      </div>
      <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-lg">
        <CloseIcon fontSize="small" onClick={(e) => removeFromCollection(e, props.id)} />
      </div>
      <div className="absolute bottom-0 right-0 bg-green-500 text-white color-white text-xs px-2 py-1 rounded-tl-lg">
        
      <img
          src={getSvgPath(props.type)}
          alt="Type Icon"
          color='white'
          className="w-4 h-4"
        />
      </div>
      <div className="w-full text-white h-48">
        <img
          src={props.picture}
          alt={"No Picture"}
          className="w-full h-full bg-[#1E1E1E] object-contain rounded-t-lg"
        />
      </div>
      <div className="px-6 py-4 bg-[#333333]">
        <h2 className="font-bold md:text-xl mb-2 text-white">
          {props.title.length > 30 ? props.title.slice(0, 29) + "..." : props.title}
        </h2>
        <div className="flex items-center text-white text-sm mb-2">
          <CalendarDays className="h-4 w-4 mr-2" />
          <span>{props.author}</span>
        </div>
        <div className="flex items-center text-white text-sm">
          <Tag className="h-4 w-4 mr-2" />
          <span>{props.type}</span>
        </div>
      </div>
    </div>
  );
};

export default Entry;