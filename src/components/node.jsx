import React, {useState} from "react";

function node(props){
    function local1(){
        if(props.isStart==false && !props.c){
            if(props.isEnd==false && !props.d)return true;
        }
        if(props.isStart==true){
            props.togst([props.rowid,props.colid]);
            props.setc(true);
            return false;
        }
        else if(props.isEnd==true){
            props.togen([props.rowid,props.colid]);
            props.setd(true);
            return false;
        }
        else{
            return true;
        }
    }
    function local2(){
        if(props.c)props.togst([props.rowid,props.colid]);
        if(props.d)props.togen([props.rowid,props.colid]);
        return true;
    }
    function local3(){
        if(props.c){props.setc(false);}
        if(props.d){props.setd(false);}
        return true;
    }

    return (
        <div  
             onMouseDown={() => local1() && props.setbool(true)} 
             onMouseEnter={() => local2() && props.bool &&  props.Clicks([props.rowid,props.colid])}
            //  onMouseDrop={()=> local2()}
             onMouseUp={() => local3() && props.setbool(false)} 
             onClick={() =>  props.Clicks([props.rowid,props.colid])}

        className={props.isEnd? "box en": 
                    (props.isStart? "box st":
                        (props.isWall?"box wall":
                            (props.ispath?"box path":
                                (props.isVisited?"box vis":
                                    (props.isExplored?"box q":"box"
                                    )
                                )
                            )
                        )
                    )
                    }> 
        </div>
    );
}

export default node;