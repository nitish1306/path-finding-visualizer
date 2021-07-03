import React from "react";

function astar(board, markVisited, markExplored, markPath, t, direction){
    const ROW_SIZE = 15;
    const COLUMN_SIZE = 49;
    let start=[];
    let end=[];
    let time=0;
    for(let i=0; i<ROW_SIZE ; i++)
    {
        for(let j=0; j<COLUMN_SIZE; j++)
        {
            if(board[i][j].isStart)start=[i,j];
            else if(board[i][j].isEnd)end=[i,j];
            if(board[i][j].isStart || board[i][j].isEnd){
                board[i][j].isVisited=false;
                board[i][j].isExplored=false;
                board[i][j].ispath=false;
                board[i][j].isWall=false;
            }
        }
    }

    function distance(x1,y1){
      if(direction==4) return (Math.abs(x1-end[0])+Math.abs(y1-end[1]));
      else return (Math.min(Math.abs(x1-end[0]),Math.abs(y1-end[1]))*Math.sqrt(2)+Math.max(Math.abs(x1-end[0]),Math.abs(y1-end[1])));
    }
    const dx = [0, 1, 0, -1, 1, 1, -1 ,-1],
          dy = [1, 0, -1, 0, 1, -1, 1, -1];
  
    let dist = [], xxdist=[], prev = [];
    for (let i = 0; i < ROW_SIZE; i++) {
      let distRow = [],
        prevRow = [],
        xrow=[];
      for (let j = 0; j < COLUMN_SIZE; j++) {
        distRow.push(Infinity);
        xrow.push(Infinity);
        prevRow.push([i, j]);
      }
      dist.push(distRow);
      xxdist.push(xrow);
      prev.push(prevRow);
    }
    dist[start[0]][start[1]] = distance(start[0],start[1]);
    xxdist[start[0]][start[1]] = 0;
    let queue = [];
    queue.push(start);
    while (queue.length > 0) {
        let sz = queue.length;
        const [x1,y1]=queue[0];
        let dis = dist[x1][y1];
        let index=0;
        for(let j=1;j<sz;j++){
            let [x1,y1]= queue[j];
            let d = dist[x1][y1];
            if(dis>d)
            {
              dis=d;
              index=j;
            }
            else if(dis===d){
              let [x,y]=queue[index];
              if(distance(x,y) > distance(x1,y1)){
                index=j;
              }
            }
        }
        let temp = queue[0];
        queue[0]=queue[index];
        queue[index]=temp;
        let curr = queue.shift();
        setTimeout(() => markVisited(curr),time);
        time+=t;
        if (curr[0] === end[0] && curr[1] === end[1]) {
          curr = prev[curr[0]][curr[1]];
          let st =[];
          st.push(curr);
          while (true) {
            let temp = curr;
            st.push(temp);
            if (curr === start) {
              for(let j=st.length-1;j>=0;j--){
                setTimeout(() => markPath(st[j]),time);
                time+=t;
              }
              return;
            }
            curr = prev[curr[0]][curr[1]];
          }
        }
          for (let i = 0; i < direction; i++) {
            let next = [curr[0] + dx[i], curr[1] + dy[i]];
            if (
              next[0] >= 0 &&
              next[0] < ROW_SIZE &&
              next[1] >= 0 &&
              next[1] < COLUMN_SIZE &&
              !board[next[0]][next[1]].isWall &&
              !board[next[0]][next[1]].isVisited &&
              dist[next[0]][next[1]] > 1+ dist[curr[0]][curr[1]]
            ) {
              console.log(next[0]+" "+next[1]);
              queue.push(next);
              prev[next[0]][next[1]] = curr;
              xxdist[next[0]][next[1]] = xxdist[curr[0]][curr[1]]+ 1;
              let c = xxdist[next[0]][next[1]];
              dist[next[0]][next[1]] = distance(next[0],next[1]) + c;
              setTimeout(() => markExplored(next),time);
              time+=t;
            }
          }
      }
      setTimeout(() => markPath(start),time);
      time+=t;
    };
  
  export default astar;