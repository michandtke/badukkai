import {Button} from "@material-ui/core";
import React from "react";

export default function LoadKifu({setShowKifus}) {
    return (<div>
            In the Future, you can hopefully select kifus here.
            <br/>
            <Button variant="contained" color="primary" onClick={() => setShowKifus(false)}>Close</Button>
        </div>
    )
    // const [loading, setLoading] = useState(true)
    // const [data, setData] = useState("")
    // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // axios.defaults.headers.common['Content-Type'] ='application/x-www-form-urlencoded';
    // // axios('http://gokifu.com', {
    // //     method: 'GET',
    // //     mode: 'no-cors',
    // // }).then((response) => {
    // //     console.log(response);
    // //     setLoading(false)
    // // }).catch((e) => {
    // //     console.log(e);
    // //     setLoading(false)
    // // });
    //
    // const testURL = 'http://gokifu.com';
    // const myInit = {
    //     method: 'GET',
    //     mode: 'no-cors',
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     // credentials: 'same-origin',
    //     headers: {
    //         // 'Content-Type': 'application/json'
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Origin': 'http://gokifu.com'
    //     },
    //     redirect: 'follow',
    // };
    //
    // const myRequest = new Request(testURL, myInit);
    //
    // fetch(myRequest).then(function(response) {
    //     return response;
    // }).then(function(response) {
    //     console.log(response)
    //     // console.log(response.json())
    //     setLoading(false)
    // }).catch(function(e){
    //     console.log(e);
    //     setLoading(false);
    // });
    //
    // // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // // axios.get('http://gokifu.com', {mode: 'no-cors'}).then(resp => {
    // //     setData(resp.data)
    // //     setLoading(false)
    // // });
    // // var url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJk0aJYPbk3JQRLpKN20Jecko&fields=name,rating,formatted_phone_number&key=MyKey`;
    // // const url2 = "http://bit.ly/2mTM3nY"
    // return (<div>
    //     Kifus
    //     <br />
    //     {(loading) ? "Loading ..." : undefined}
    //     {(!loading) ? data : undefined}
    //     {/*<Get url={url2}>*/}
    //     {/*    {(error, response, isLoading, makeRequest, axios) => {*/}
    //     {/*        if (error) {*/}
    //     {/*            return (*/}
    //     {/*                <div>Something bad happened: {error.message}*/}
    //     {/*                    <button onClick={() => makeRequest({params: {reload: true}})}>Retry</button>*/}
    //     {/*                </div>*/}
    //     {/*            )*/}
    //     {/*        } else if (isLoading) {*/}
    //     {/*            return (<div>Loading...</div>)*/}
    //     {/*        } else if (response !== null) {*/}
    //     {/*            return (<div>{response.data.message}*/}
    //     {/*                <button onClick={() => makeRequest({params: {refresh: true}})}>Refresh</button>*/}
    //     {/*            </div>)*/}
    //     {/*        }*/}
    //     {/*        return (<div>Default message before request is made.</div>)*/}
    //     {/*    }}*/}
    //     {/*</Get>*/}
    //     <br/>
    //     <Button variant="contained" color="primary" onClick={() => setShowKifus(false)}>Close</Button>
    // </div>)
}

function loadData() {

}