import MovieList from 'features/booking/compoment/MovieList'
import React from 'react'
import { useState } from 'react'
import { Pagination } from "antd"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMoviesAction } from 'features/booking/action'

function Home() {

  const dispatch = useDispatch()
  const [config, setConfig] = useState({
    currentPage: 1,
    pageSize: 8,
    totalCount: 0,
  });

  const changeTotalCount = (total) => {
    setConfig({ ...config, totalCount: total });
  }

  const fetchMovies = async () => {
    dispatch(fetchMoviesAction(config, changeTotalCount))
  }

  
  useEffect(() => {
    fetchMovies()
  }, [config.currentPage]);

  const handleChangePage = (page) => {
    setConfig({ ...config, currentPage: page });
  }
  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: 40 }}>Danh sách phim</h1>
      <MovieList />
      <Pagination
        style={{ display: "flex", justifyContent: "center" }}
        onChange={handleChangePage}
        current={config.currentPage}
        pageSize={config.pageSize}
        total={config.totalCount}
      />
    </div>
  )
}

export default Home