import React from "react";

function greedy(board, markVisited, markExplored, markPath,t,direction){
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
    function distance(x1,y1,x2,y2){
        if(direction===4)return (Math.abs(x1-x2)+Math.abs(y1-y2));
        else return (Math.min(Math.abs(x1-x2),Math.abs(y1-y2))*Math.sqrt(2)+Math.max(Math.abs(x1-x2),Math.abs(y1-y2)));
    }

    const dx = [0, 1, 0, -1, 1, 1, -1 ,-1],
      dy = [1, 0, -1, 0, 1, -1, 1, -1];
  
    let dist = [],
      prev = [];
    for (let i = 0; i < ROW_SIZE; i++) {
      let distRow = [],
        prevRow = [];
      for (let j = 0; j < COLUMN_SIZE; j++) {
        distRow.push(Infinity);
        prevRow.push([i, j]);
      }
      dist.push(distRow);
      prev.push(prevRow);
    }
  
    dist[start[0]][start[1]] = 0;
  
    let queue = [];
    queue.push(start);
    while (queue.length > 0) {
        let sz = queue.length;
        const [x1,y1]=queue[0];
        // let c= queue[0];
        let dis = distance(x1,y1,end[0],end[1]);
        let j=1,index=0;
        for(;j<sz;j++){
            let [x1,y1]= queue[j];
            if(dis>distance(x1,y1,end[0],end[1]))
            {
                dis=distance(x1,y1,end[0],end[1]);
                // c=queue[j];
                index=j;
            }
        }
        let temp = queue[0];
        queue[0]=queue[index];
        queue[index]=temp;
        let curr = queue.shift();
        console.log(curr);
        //   console.log(curr[0]);
          setTimeout(() => markVisited(curr), time);
          time+=t;
          //path found 
          if (curr[0] === end[0] && curr[1] === end[1]) {
            curr = prev[curr[0]][curr[1]];
            let st =[];
            st.push(curr);
            while (true) {
              st.push(curr);
              if (curr === start) {
                for(let j = st.length-1 ; j>=0; j--){
                  setTimeout(() => markPath(st[j]), time);
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
              !board[next[0]][next[1]].isExplored &&
              dist[next[0]][next[1]] > 1 + dist[curr[0]][curr[1]]
            ) {
              queue.push(next);
              prev[next[0]][next[1]] = curr;
              dist[next[0]][next[1]] = 1 + dist[curr[0]][curr[1]];
              setTimeout(() => markExplored(next), time);
              time+=t;
            }
          }
      }
      setTimeout(() => markPath(start), time);
      time+=t;
    };
  
  export default greedy;