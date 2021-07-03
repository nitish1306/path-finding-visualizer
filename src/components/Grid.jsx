import React, { useState, useEffect } from "react";
import { getSupportedCodeFixes, setSyntheticLeadingComments } from "typescript";
import Node from "./node";
import Bfs from "./bfs";
import Greedy from "./Greedy";
import Astar from "./Astar";

const ROWS = 15;
const COL = 49;


function Grid(){
    
    const [c,setC]=useState(false);
    const [d,setD]=useState(false);
    const arr=[];    
    const [time,setTime]=useState(10);
    const [speed,setSpeed]=useState("Normal");
    const [dtext,setDtext]= useState("No Diagonal Moves");
    const [direction,setDirection] = useState(4);
    for(let i=0;i<ROWS;i++){
        const eachrow=[]
        for(let j=0;j<COL;j++){
            eachrow.push({
                rowid: i,
                colid: j,
                isVisited: false,
                isStart: false,
                isEnd: false,
                isWall: false,
                isExplored: false,
                ispath: false,
                parent: [],
                bool: false
            });
        }
        arr.push(eachrow);
    }
    //start and end positions
    arr[7][5].isStart=true;
    arr[7][38].isEnd=true;
    const [grid,setGrid]= useState(arr);
    const [bool,setBool]= useState(false);
    
    const [test, setTest] = useState(0);
    //for walls display
    function handleClick([i,j]){
        grid[i][j].isWall^=true;
        setGrid(grid);
        setTest(Math.random());   
    }
    //speed check
    function speedcheck(){
        if(speed==="Normal"){
            setSpeed("Fast");
            setTime(10);
        }
        else if(speed==="Fast"){
            setSpeed("Slow");
            setTime(100);
        }
        else{
            setSpeed("Normal");
            setTime(50)
        }
    }
    //direction DIAGONAL moves
    function dchange(){
        if(dtext==="No Diagonal Moves"){
            setDtext("Diagonal Moves allowed");
            setDirection(8);
        }
        else{
            setDtext("No Diagonal Moves");
            setDirection(4);
        }
    }
    //display walls and move center thing
    function togst([i,j]){
        grid[i][j].isStart^=true;
        for(let x=0;x<ROWS;x++){
            for(let y=0;y<COL;y++){
                if(i!=x || j!=y){
                    grid[x][y].isStart=false;
                }
            }
        }
        setGrid(grid);
        setTest(Math.random());
    }
    function togen([i,j]){
        grid[i][j].isEnd^=true;
        for(let x=0;x<ROWS;x++){
            for(let y=0;y<COL;y++){
                if(i!=x || j!=y){
                    grid[x][y].isEnd=false;
                }
            }
        }
        setGrid(grid);
        setTest(Math.random());
    }
    function setcv(val){
        setC(val);
        setTest(Math.random());
    }
    function setdv(val){
        setD(val);
        setTest(Math.random());
    }
    function f(a){
        setBool(a);
    }
    function clr(grid){
        console.log("working");
        for(let i=0;i<ROWS;i++){
            for(let j=0;j<COL;j++){
                grid[i][j].isExplored=false;
                grid[i][j].isVisited=false;
                grid[i][j].ispath=false;
            }
        }
        setTest(Math.random());
        setGrid(grid);
        setTest(Math.random());
        return true;
    }
    //reset board
    function resboard(){
        const arr=[];    
        for(let i=0;i<ROWS;i++){
            const eachrow=[]
            for(let j=0;j<COL;j++){
                eachrow.push({
                    rowid: i,
                    colid: j,
                    isVisited: false,
                    isStart: false,
                    isEnd: false,
                    isWall: false,
                    isExplored: false,
                    ispath: false,
                    parent: [],
                    bool: false
                });
            }
            arr.push(eachrow);
        }
        //start and end positions
        arr[7][5].isStart=true;
        arr[7][38].isEnd=true;
        setGrid(arr);
        setTest(Math.random());
    }

    function markVis([i,j]){
        if(!grid[i][j].isStart && !grid[i][j].isEnd)
        {
            grid[i][j].isVisited=true;
            grid[i][j].isExplored=false;
            setGrid(grid);
            setTest(Math.random());
        }
        setTest(Math.random());  
    }
    function markexplored([i,j]){
        if(!grid[i][j].isStart && !grid[i][j].isEnd)
        {
            grid[i][j].isExplored=true;
            setGrid(grid);
            setTest(Math.random());
        }
        setTest(Math.random());
    }
    function markpath([i,j]){
        if(!grid[i][j].isStart)
        {
            grid[i][j].isExplored=false;
            grid[i][j].ispath=true;
            setGrid(grid);
            setTest(Math.random());
        }
        setTest(Math.random());
    }
    
    //main return call for grid and button display
    return (
    <div>
        {grid.map((row,rowid) => {
            return (<div className="erow">
                {row.map((col,colid) => {
                    return (
                        <Node 
                            rowid={grid[rowid][colid].rowid}
                            colid={grid[rowid][colid].colid}
                            isStart={grid[rowid][colid].isStart}
                            isEnd={grid[rowid][colid].isEnd}
                            isVisited={grid[rowid][colid].isVisited}
                            isWall={grid[rowid][colid].isWall}
                            isExplored={grid[rowid][colid].isExplored}
                            ispath={grid[rowid][colid].ispath}
                            parent={grid[rowid][colid].parent}
                            bool={bool}
                            setbool={f} 
                            Clicks={handleClick}
                            togen={togen}
                            togst={togst}
                            c={c}
                            d={d}
                            setc={setcv}
                            setd={setdv}
                        />
                    );
                })
                }
            </div>)
            }
        )
        }
        <div className="bot">
            <div className="botli" onClick={() => dchange()}><a className="x">{dtext}</a></div>
            <div className="botli" onClick={() => speedcheck()}><a className="x">{speed}</a></div>
            <div className="botli algo" onClick={() => clr(grid) && Bfs(grid,markVis,markexplored,markpath,time, direction)}><a  className="x" >Dijkstra Algorithm</a></div>
            <div className="botli algo" onClick={() => clr(grid) && Greedy(grid,markVis,markexplored,markpath,time, direction)}><a  className="x" >Greedy-Best First Search</a></div>
            <div className="botli algo" onClick={() => clr(grid) && Astar(grid,markVis,markexplored,markpath,time, direction)}><a  className="x" >A-star Algorithm</a> </div>
            <div className="botli" onClick={() => resboard()}><a  className="x" >Reset Board</a></div>
            <div className="botli" onClick={() => clr(grid)}><a className="x" >Clear</a></div>
            {/* <li className="left botli"><a className="botlia0" onClick={() => clr(grid) && Bfs(grid,markVis,markexplored,markpath,time)}>Dijkstra Algorithm</a></li>
            <li className="botli"><a className="botlia1" onClick={() => clr(grid) && Greedy(grid,markVis,markexplored,markpath,time)}>Greedy-Best First Search</a></li>
            <li className="botli"><a className="botlia2" onClick={() => resboard()}>Reset Board</a></li>
            <li className="botli"><a class="botlia3" onClick={() => clr(grid)}>Clear</a></li>
            <li className="botli main">
                <a className="visualizebtn" onClick={() => clr(grid) && Astar(grid,markVis,markexplored,markpath,time)}>A-star Algorithm</a> 
            </li> */}
        </div>
    </div>
    );
}
export default Grid;