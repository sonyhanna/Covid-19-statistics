import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import { Button, Row, Col } from 'react-bootstrap';



function Map() {

    const [status, setStatus] = useState();
    const [results, setResults] = useState([]);
    const [value, setValue] = useState(1);

    useEffect(() => {
        axios
            .all([
                axios.get("https://api.covid19api.com/summary"),
                axios.get('https://coronavirus-tracker-api.herokuapp.com/v2/locations'),
            ])
            .then((responseArr) => {
                console.log(responseArr)
                setStatus(responseArr[0]?.data?.Global);
                setResults(responseArr[1]?.data?.locations);
                // setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const countries1 = results.map((data, i) => {
        return (
            <div
                lat={data.coordinates?.latitude}
                lng={data.coordinates?.longitude}
                style={{
                    color: 'white', height: '30px', width: '30px', backgroundColor:
                        'red', textAlign: 'center', borderRadius: '50%', alignItems: 'center', display: 'flex', justifyContent: 'center'
                }}
            >
                {data.latest.confirmed}
            </div >
        );
    });
    const countries2 = results.map((data, i) => {

        return (
            <div
                lat={data.coordinates?.latitude}
                lng={data.coordinates?.longitude}
                style={{
                    color: 'white', height: '30px', width: '30px', backgroundColor:
                        'black', textAlign: 'center', borderRadius: '50%', alignItems: 'center', display: 'flex', justifyContent: 'center'
                }}
            >
                {data.latest.deaths}
            </div >
        );
    });
    const countries3 = results.map((data, i) => {
        return (
            <div
                lat={data.coordinates?.latitude}
                lng={data.coordinates?.longitude}
                style={{
                    color: 'white', height: '30px', width: '30px', backgroundColor:
                        'green', textAlign: 'center', borderRadius: '50%', alignItems: 'center', display: 'flex', justifyContent: 'center'
                }}
            >
                {data.latest.recovered}
            </div >
        );
    });


    return (
        <div>
            <CardGroup>
                <Card bg='danger' text='white' className='text-center' style={{ margin: 10, borderRadius: 10 }}>
                    <Card.Body >
                        <Card.Title>Cases</Card.Title>
                        <Card.Text>
                            {status?.NewConfirmed}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small > {status?.Date}</small>
                    </Card.Footer>
                </Card>
                <Card bg='black' text='white' className='text-center' style={{ margin: 10, borderRadius: 10 }}>
                    <Card.Body>
                        <Card.Title>Death</Card.Title>
                        <Card.Text>
                            {status?.NewDeaths}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small > {status?.Date}</small>
                    </Card.Footer>
                </Card>
                <Card bg='success' text='white' className='text-center' style={{ margin: 10, borderRadius: 10 }}>
                    <Card.Body>
                        <Card.Title>Recovered</Card.Title>
                        <Card.Text>
                            {status?.NewRecovered}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small > {status?.Date}</small>
                    </Card.Footer>
                </Card>
            </CardGroup >

            <Row className="mx-0" style={{ marginBottom: 10, padding: '10px 20px 10px 10px' }}>
                <Button as={Col} variant="danger" onClick={() => setValue(1)}>Click here</Button>
                <Button as={Col} style={{ backgroundColor: 'black' }} onClick={() => setValue(2)} className=" mx-2" > Click here</Button>
                <Button as={Col} style={{ backgroundColor: '#198754' }} onClick={() => setValue(3)} >click here</Button>
            </Row>


            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: 'AIzaSyAfJwinkWZM4buYfkMqV - aUjvTBueRf1_U'
                    }}
                    defaultCenter={{ lat: 21.809833, lng: 78.744287 }}
                    defaultZoom={4}
                >
                    {value === 1 ? countries1 : value === 2 ? countries2 : countries3}
                </GoogleMapReact>
            </div>
        </div >
    );
}

export default Map;
