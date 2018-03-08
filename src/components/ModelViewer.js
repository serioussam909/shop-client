import React, { Component } from 'react';
import "aframe";
import 'aframe-orbit-controls-component-2';


class ModelViewer extends Component {

    constructor(props) {
		super(props);
		this.state = {
			modelFilepath: props.modelFilepath
		};
    }
    
    render(){
        return(
            <div className="panel panel-default" style={{width:700,height:500}}>	
            <a-scene embedded>
                <a-sky color="#111111"/>
                <a-assets>
                    <a-asset-item id="uploadedModel" src={this.state.modelFilepath}></a-asset-item>
                </a-assets>

                <a-entity
                    id="camera"
                    camera="fov: 80; zoom: 1;"
                    position="0 1.5 1.5"
                    orbit-controls="
                        autoRotate: false;
                        target: #camTarget;
                        enableDamping: true;
                        dampingFactor: 0.125;
                        rotateSpeed:0.2;
                        minDistance:2;
                        maxDistance:5;
                        "
                    mouse-cursor=""/>
                 <a-collada-model scale="100 100 100" position="0 0 0" id="camTarget" src="#uploadedModel"></a-collada-model>
                </a-scene>
            </div>
        );
    }
}

export default ModelViewer;