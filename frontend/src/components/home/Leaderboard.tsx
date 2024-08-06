import React from 'react';
import { Box, Flex, Text, Table, Thead, Tbody, Tr, Th, Td, Avatar, Badge, useColorModeValue } from '@chakra-ui/react';
import { FaMedal } from 'react-icons/fa';

// Define the type for a player
interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  status: string;
}

// Example data - replace with actual data
const currentPlayers: Player[] = [
  { id: 1, name: "John Doe", position: "Forward", age: 25, status: "Critical" },
  { id: 2, name: "Jane Smith", position: "Midfielder", age: 30, status: "Normal" },
  // Add more players as needed
];

// Update component with type annotations
function Leaderboard() {
  const textColor = useColorModeValue('gray.800', 'white'); // Example color setting

  // Define the function with explicit parameter type
  const handlePhoneNumberClick = (age: number) => {
    // Handle phone number click functionality
    console.log(`Phone number clicked for age: ${age}`);
  };

  return (
    <Box
      p="4"
      bg={useColorModeValue('white', 'gray.700')}
      shadow="md"
      rounded="md"
      overflowX={{ base: "scroll", lg: "hidden" }}
    >
      <Flex direction='column' px="4" py="7">
        <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
          Leaderboard: Players with Critical Status
        </Text>
        <Text fontSize='sm' color='gray.400' fontWeight='normal'>
          The best 
          <Text fontWeight='bold' as='span' color='teal.300'>
            {` 7`}
          </Text>{" "}
          Players out of
          <Text fontWeight='bold' as='span' color='teal.300'>
            {` 100`}
          </Text>{" "}
        </Text>
      </Flex>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Player Name</Th>
            <Th>Age</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentPlayers.map((player, index) => (
            <Tr key={player.id}>
              <Td>
                {index + 1 === 1 ? (
                  <Box display="flex" alignItems="center">
                    <FaMedal color="#fcb103" />
                    <Text ml="2" color="#fcb103">1</Text>
                  </Box>
                ) : index + 1 === 2 ? (
                  <Box display="flex" alignItems="center">
                    <FaMedal color="#3557a1" />
                    <Text ml="2" color="#3557a1">2</Text>
                  </Box>
                ) : index + 1 === 3 ? (
                  <Box display="flex" alignItems="center">
                    <FaMedal color="#CD7F32" />
                    <Text ml="2" color="#CD7F32">3</Text>
                  </Box>
                ) : (
                  <Text>{index + 1}</Text>
                )}
              </Td>
              <Td>
                <Flex align="center">
                  <Avatar name={player.name} src="" size="md" />
                  <Box ml="3">
                    <Text fontWeight="bold" fontSize="md">
                      {player.name}
                    </Text>
                    <Text fontSize="sm">{player.position}</Text>
                  </Box>
                </Flex>
              </Td>
              <Td onClick={() => handlePhoneNumberClick(player.age)} style={{ cursor: 'pointer', color: 'darkblue' }}>
                {player.age}
              </Td>
              <Td>
                <Badge colorScheme={player.status === 'Critical' ? 'red' : 'green'}>
                  {player.status}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Leaderboard;
