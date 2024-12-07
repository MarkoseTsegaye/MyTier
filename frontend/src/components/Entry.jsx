import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CalendarDays, Tag } from 'lucide-react'

const Entry = ({ props }) => {
  return (
    <div className=" rounded-lg overflow-hidden shadow-2xl w-full h-[100%] bg-[#333333]">
      <div className="relative w-full text-white h-48">
        <img
          src={props.picture  }
          alt={"No Picture"}
          className="w-full h-full bg-[#1E1E1E] object-contain rounded-t-lg"
        />
      </div>
      <div className="px-6 py-4 bg-[#333333]">
        <h2 className="font-bold text-xl mb-2 text-white">{props.title.length > 30 ? props.title.slice(0,29) + "...": props.title}</h2>
        <div className="flex items-center text-white text-sm mb-2">
          <CalendarDays className="h-4 w-4 mr-2" />
          <span>{props.author}</span>
        </div>
        <div className="flex items-center text-white text-sm">
          <Tag className="h-4 w-4 mr-2" />
          <span>{props.author}</span>
        </div>
      </div>
    </div>
  );
};

export default Entry;
