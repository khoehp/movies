import { Card } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom';

const { Meta } = Card

function MovieItem(props) {
    const { tenPhim, hinhAnh, moTa, maPhim } = props.item;
    const history = useHistory();

    const goToDeTail = () => {
        history.push("/detail/" + maPhim);
    }

    return (
        <Card
            onClick={goToDeTail}
            hoverable
            cover={<img style={{
                height: 300,
                objectFit: "cover",
                objectPosition: "center top"
            }} alt="example"
                src={hinhAnh}
            />}
        >
            <Meta title={tenPhim} description={moTa.substr(0, 100) + "..."} />
        </Card>
    )
}

export default MovieItem