import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import api from '../api';
import { useParams } from 'react-router-dom';

const Ranking = () => {
  const [rows, setRows] = useState([]);

  const { media } = useParams(); // Get the media parameter from the URL

  // Function to fetch items
  const getItems = (m) => {
    const url = "/api/entry/" + m;
    api
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        const formattedData = data.map(item => ({
          ...item,
          id: item.id.toString(), // Convert id to string
        }));
        // Sort items by ID
        formattedData.sort((a, b) => a.id - b.id);
        setRows(formattedData); // Set the data to state
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getItems(media); // Fetch items based on the media parameter
  }, [media]);

  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list

    const reorderedRows = Array.from(rows);
    const [removed] = reorderedRows.splice(result.source.index, 1);
    reorderedRows.splice(result.destination.index, 0, removed);

    // Update the IDs based on the new order
    const updatedRows = reorderedRows.map((row, index) => ({
      ...row,
      id: (index + 1).toString(),
    }));

    setRows(updatedRows);
  };

  return (
    <div className='fixed h-full w-full overflow-y-hidden overflow-x-hidden bg-gradient-to-b from-neutral-900 via-stone-900 to-zinc-800 '>
      <Navbar className='z-20 top-0 fixed' />
      <div className='w-full absolute z-0 bg-[bg-gradient-to-b from-neutral-900 via-stone-900 to-zinc-800] flex'>
        <Sidebar />
        <div className='w-full bg-gradient-to-b from-neutral-900 via-stone-900 to-zinc-800 p-4'>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="table">
              {(provided) => (
                <table
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-w-full divide-y bg-neutral-800 divide-gray-700 table-fixed"
                >
                  <thead className="bg-neutral-700 flex w-full">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/12">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-5/12">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-5/12">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-neutral-800 divide-y divide-gray-700">
                    {rows.map((row, index) => (
                      <Draggable key={row.id} draggableId={row.id} index={index}>
                        {(provided, snapshot) => (
                          <tr
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={`hover:bg-neutral-700 ${snapshot.isDragging ? 'bg-neutral-700' : ''}`}
                            style={{ ...provided.draggableProps.style, height: '50px' }} // Set a fixed height
                          >
                            <td className="px-4 py-2 w-1/12 text-gray-300">{index + 1}</td>
                            <td className="px-4 py-2 w-5/12 text-gray-300">
                              <img src={row.picture} alt={row.title} className="w-10 h-10 rounded-full inline-block mr-2" />
                              {row.title}
                            </td>
                            <td className="px-4 py-2 w-5/12 text-gray-300">{row.score}</td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Ranking;