import React from 'react';

const Calendar = () => {
    return (
        <div style={{width: '100%', height: '100%', position: 'relative', background: '#AAA06C', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', border: '1px black solid'}}>
    <div style={{width: 521, height: 64, left: 145, top: 66, position: 'absolute'}}>
        <div style={{width: 230, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 50, fontFamily: 'Montagu Slab', fontWeight: '400', wordWrap: 'break-word'}}>MONTH</div>
        <div style={{width: 230, left: 291, top: 0, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 50, fontFamily: 'Montagu Slab', fontWeight: '400', wordWrap: 'break-word'}}>YEAR</div>
    </div>
    <div style={{width: 50, height: 50, left: 80, top: 562, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0'}}>
        <div style={{width: 50, height: 50, left: 0, top: 0, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', background: 'rgba(217, 217, 217, 0.50)', borderRadius: 9999}} />
        <div style={{width: 0, height: 0, left: -29, top: -25, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', border: '2px black solid'}}></div>
    </div>
    <div style={{left: 145, top: 921, position: 'absolute'}}>
        <div style={{width: 60, height: 60, left: 0, top: 0, position: 'absolute'}}>
            <div style={{width: 60, height: 60, left: 0, top: 0, position: 'absolute', background: '#FABD45', borderRadius: 9999}} />
            <div style={{width: 28.24, height: 0, left: 30.35, top: 44.47, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', background: '#FABD45', border: '5px white solid'}}></div>
            <div style={{width: 28.24, height: 0, left: 16.24, top: 30.35, position: 'absolute', background: '#FABD45', border: '5px white solid'}}></div>
        </div>
        <div style={{left: 74, top: 7, position: 'absolute', color: 'white', fontSize: 40, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>Add Event</div>
    </div>
    <div style={{width: 50, height: 50, left: 1360, top: 512, position: 'absolute'}}>
        <div style={{width: 50, height: 50, left: 0, top: 0, position: 'absolute', background: 'rgba(217, 217, 217, 0.50)', borderRadius: 9999}} />
        <div style={{width: 0, height: 0, left: 29, top: 25, position: 'absolute', border: '2px black solid'}}></div>
    </div>
    <div style={{width: 60, height: 60, left: 449, top: 921, position: 'absolute'}}>
        <div style={{width: 60, height: 60, left: 0, top: 0, position: 'absolute', background: '#FABD45', borderRadius: 9999}} />
        <div style={{width: 34, height: 36, left: 13, top: 12, position: 'absolute'}}>
            <div style={{width: 27.20, height: 27.43, left: 0, top: 0, position: 'absolute', background: 'rgba(255, 246.58, 246.58, 0)', borderRadius: 9999, border: '1px white solid'}} />
            <div style={{width: 11.90, height: 12, left: 22.10, top: 24, position: 'absolute', background: 'rgba(255, 246.58, 246.58, 0)', border: '1px white solid'}}></div>
        </div>
    </div>
    <div style={{width: 290, height: 75, left: 521, top: 913, position: 'absolute', color: 'white', fontSize: 40, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>Search Event</div>
</div>
    );
};

export default Calendar;
