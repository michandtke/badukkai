import {Button} from "@material-ui/core";
import React from "react";

export default function LoadKifu({setShowKifus}) {
    return (<div>
        Kifus
        <br />
        <Button variant="contained" color="primary" onClick={() => setShowKifus(false)}>Close</Button>
    </div>)
}