import { Link, Card, Stack, CardHeader, Heading, CardBody, Spacer, CardFooter, Center, Text } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

export default function EventCard({ key, team_id, updatedAtString, event }) {
    return(
    <Link key={key} style={{ textDecoration: 'none' }} href={'/dashboard/' + team_id + '/events/' + event.id} w={"100%"}>
        <Card direction={{ base: 'row' }} variant='filled' overflow='hidden' _hover={{ bg: "gray.200" }} w={"100%"} className="hover:shadow-sm">
            <Stack>
                <CardHeader>
                    <Heading size='md'> {event.name}</Heading>
                </CardHeader>
                <CardBody>
                    <Text>Updated {updatedAtString}</Text>
                </CardBody>
            </Stack>
            <Spacer />
            <CardFooter>
                <Center w='5'>
                    <ArrowForwardIcon boxSize={7} color="teal.600" />
                </Center>
            </CardFooter>
        </Card>
    </Link>
    )
}
