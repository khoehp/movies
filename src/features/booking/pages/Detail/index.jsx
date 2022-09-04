import { Button, Card, Spin } from 'antd';
import { formatDate } from 'common/utils/date';
import { fetchCinemasAction, fetchMovieScheduleAction, fetchMoviesDetailAction } from 'features/booking/action';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import styles from "../Detail/Detail.module.css"
function Detail() {
  // call api => láy thông tin phim
  //1. len url lấy mã phim
  //2. viết async action fetchMovieDetailAction
  //3. dispatch async action
  //4. lên store, tạo thêm dữ liệu mới 
  //5. lất selectedMovie và hiện ra màn hình

  const dispatch = useDispatch()
  const match = useRouteMatch()
  const movieId = match.params.id;

  const fetchMovieDetail = async () => {
    dispatch(fetchMoviesDetailAction(movieId))
  }

  const schedule = useSelector((state) => {
    return state.booking.schedule
  })
  const fetchCinemas = async () => {
    const data = await dispatch(fetchCinemasAction)
    console.log(data);
    fetchMovieSchedule(data[0].maHeThongRap);
  }

  const fetchMovieSchedule = (id) => {
    dispatch(fetchMovieScheduleAction(id))
  }

  useEffect(() => {
    fetchMovieDetail();
    fetchCinemas();
  }, []);


  const cinemas = useSelector((state) => state.booking.cinemas)
  const movieDetail = useSelector((state) => state.booking.selectedMovie)

  if (!movieDetail) {
    return <Spin></Spin>
  }

  return (
    <div className='container'>
      <h1 style={{ textAlign: "center", fontSize: 40 }}>Thong tin phim</h1>
      <div className={styles.row}>
        <div className={styles.col}>
          <img src={movieDetail.hinhAnh} />
        </div>
        {movieDetail.trailer.startsWith("https") && <iframe src={movieDetail.trailer} frameBorder="0"></iframe>}
        <div className={styles.col}>
          <h3> Tên phim: {movieDetail.tenPhim}</h3>
          <p> Mô tả: {movieDetail.moTa}</p>
          <h3>Trailer</h3>


        </div>
      </div>
      <div style={{ margin: 30 }}>
        {cinemas?.map((item) => {
          return <img style={{ width: 100, marginRight: 20, }} src={item.logo} alt="" />
        })}

        {schedule?.lstCumRap.map((item) => {
          const currentMovie = item.danhSachPhim.find((movie) => movie.maPhim.toString() === movieId
          );
          if (!currentMovie) return null;

          return <Card style={{ margin: 30, background: "#000", color: "#fff" }}>
            <img src={item.hinhAnh} />
            <p style={{ fontSize: 30 }}>{item.tenCumRap}</p>
            {/* list các suất chiêus  */}
            {currentMovie.lstLichChieuTheoPhim.map((show) => {

              return (
                <Button type='default' style={{ marginRight: 10 }}>
                  {formatDate(show.ngayChieuGioChieu)}</Button>
              )

            })}
          </Card>

        })}

      </div>
    </div>
  )
}

export default Detail