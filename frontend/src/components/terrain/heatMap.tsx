import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Player } from './types';

const positionMapping: { [key: string]: { x: number; y: number } } = {
    'GK': { x: 10, y: 50 },
    'LB': { x: 20, y: 20 },
    'RB': { x: 20, y: 80 },
    'CB': { x: 30, y: 40 },
    'CDM': { x: 50, y: 40 },
    'CAM': { x: 70, y: 50 },
    'LM': { x: 80, y: 30 },
    'RM': { x: 80, y: 70 },
    'LW': { x: 90, y: 20 },
    'RW': { x: 90, y: 80 },
    'ST': { x: 90, y: 50 },
};

const FootballField = () => {
    const [playerPositions, setPlayerPositions] = useState<Player[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/footinsights/')
            .then(response => {
                const filteredPlayers = response.data
                    .filter((player: any) => player.Nationality === 'Morocco')
                    .map((player: any) => ({
                        ...player,
                        ...positionMapping[player.Best_Position] || { x: 50, y: 50 } // Default position if not mapped
                    }));

                setPlayerPositions(filteredPlayers);
            })
            .catch(error => {
                console.error('Error fetching player data:', error);
            });
    }, []);

    return (
        <div style={{ width: '80vw', height: '90vh' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Football field */}
                <rect x="0" y="0" width="100" height="100" fill="green" />
                {/* Field lines */}
                <rect x="1" y="1" width="98" height="98" fill="none" stroke="white" strokeWidth="0.5" />
                {/* Center circle */}
                <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="0.5" />
                {/* Players */}
                {playerPositions.map((player, index) => (
                    <Joueur key={index} x={player.x} y={player.y} name={player.Name} />
                ))}
            </svg>
        </div>
    );
};

interface JoueurProps {
    x: number;
    y: number;
    name: string;
}

const Joueur: React.FC<JoueurProps> = ({ x, y, name }) => {
    return (
        <>
            <circle cx={x} cy={y} r="1" fill="blue" />
            <text x={x + 1} y={y} fill="white" fontSize="3">
                {/* {name} */}
            </text>
        </>
    );
};

export default FootballField;
