import { Link, Card, Stack, CardHeader, Heading, CardBody, Spacer, CardFooter, Center, Text } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

export default function TeamCard({ key, team }) {
    return (
        <Link key={key} style={{ textDecoration: 'none' }} href={'/dashboard/' + team.id + '/events'}>
        <Card direction={{ base: 'row' }} variant='outline' overflow='hidden' _hover={{ bg: "gray.100" }} className="hover:shadow-sm">
            <Stack>
                <CardHeader>
                    <Heading size='md'> {team.name}</Heading>
                </CardHeader>
                <CardBody>
                    <Text>{team.season_name}</Text>
                    <Text>{team.player_member_count} players</Text>
                </CardBody>
            </Stack>
            <Spacer />
            <CardFooter>
                <Center w='5'>
                    <ArrowForwardIcon boxSize={7} color="teal.600"/>
                </Center>
            </CardFooter>
        </Card>
        </Link>
    )
}