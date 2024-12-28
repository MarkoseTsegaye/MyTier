import React from 'react'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
      const navigate = useNavigate();
    
  return (
    <Stack className='w-[30%] lg:w-1/5 overflow-y-auto bg-[#121212] flex flex-col space-y-7 pt-10 font-bold  h-screen  text-white'spacing={6}>
        <SimpleTreeView className=' text-2xl '>

            <TreeItem onClick={()=>navigate('/collection/all')} className='bg-[#333] p-4 ' itemId="home" label="Home"/>

            <TreeItem className='bg-[#333] text-xl'itemId="collection" label="Collection">

                <TreeItem onClick={()=>navigate('/collection/anime')} itemId="anime" label="Anime"/>
                <TreeItem onClick={()=>navigate('/collection/book')} itemId="book" label="Books"/>
                <TreeItem onClick={()=>navigate('/collection/tv')} itemId="tv" label="TV"/>
                <TreeItem onClick={()=>navigate('/collection/game')} itemId="game" label="Video Games"/>
            </TreeItem>
            
            <TreeItem className='bg-[#333]' itemId="future" label="Future List">
            <TreeItem itemId="future-all" label="All"/>

                <TreeItem itemId="future-anime" label="Anime"/>
                <TreeItem itemId="future-book" label="Books"/>
                <TreeItem itemId="future-tv" label="TV"/>
                <TreeItem itemId="future-game" label="Video Games"/>

            </TreeItem>

            </SimpleTreeView>

        
    </Stack>
  )
}

export default Sidebar