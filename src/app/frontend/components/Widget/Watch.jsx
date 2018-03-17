// import React from 'react';
// import Clock from 'react-live-clock';
//
// export class Watch extends React.Component {
//   render() {
//     return (
//       <div>
//         <div className="row">
//           <div className="col-12">
//           <Clock format={'DD MMMM, dddd, HH:mm:ss'} ticking={true} timezone={'Europe/Tallinn'}/>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
import React  from 'react';
import Clock from 'react-live-clock';

export class Watch extends React.Component {
    render() {
      return (
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />

      );
    }
}
