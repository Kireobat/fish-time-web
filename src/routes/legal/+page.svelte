<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import {
        A,
        Card,
        Heading,
        P,
        Button,
        Avatar,
        Blockquote,
        Timeline,
        TimelineItem,
        Tooltip,
        Badge,
        Gallery,
        DropdownDivider,
    } from "flowbite-svelte";

    interface LegalTeamMember {
        name: string;
        title: string;
        specialty: string;
        bio: string;
        picture: string;
    }

    // Our prestigious legal team
    const legalTeam: LegalTeamMember[] = [
        {
            name: "Fin Dorsett",
            title: "Chief Legal Sturgeon",
            specialty: "Maritime Law",
            bio: "Graduated magna cum laude from Coral Reef Law School. Has never lost a case that involved water rights.",
            picture: "/images/fin-dorsett.jpg",
        },
        {
            name: "Gill Bates",
            title: "Senior Litigator",
            specialty: "Intellectual Property",
            bio: "Specializes in protecting your ideas from being stolen by land-dwelling competitors.",
            picture: "/images/gill-bates.jpg",
        },
        {
            name: "Sole Goodfin",
            title: "Contract Specialist",
            specialty: "Fine Print",
            bio: "Former scale-mail salesman turned attorney with a shady reputation. Known for his 'Better Call Sole!' billboards and impressive client list. It includes Walleye White (the 'Kingfin' of the blue methyl market) and various gill-ty reef gangsters. Expert in loophole creation and getting clients off the hook—literally. As he says, 'I don't swim in criminal waters, I'm just a criminal's water guide.'",
            picture: "/images/sole-goodfin.jpg",
        },
        {
            name: "Molly Mullet",
            title: "Legal Assistant",
            specialty: "Document Filing",
            bio: "Maintains our extensive archives stored in waterproof containers at the bottom of our office aquarium.",
            picture: "/images/molly-mullet.jpg",
        },
    ];

    let selectedAttorney: LegalTeamMember = $state(legalTeam[0]);

    const fishLegalJokes = [
        "My contracts are water-tight!",
        "I're experts in maritime claw",
        "I've never lost a case... of fish food",
        "Specializing in shark-tank negotiations",
        "My fine print is written in ink... squid ink!",
        "I don't flounder when defending your rights",
        "I've been swimming through legal loopholes since 2010",
        "Scale-tipping evidence is my specialty",
        "I know all about gill-ty verdicts",
    ];

    const soleGoodfinJokes = [
        "Did you know that you have rights? Constitution says you do! And so do I!",
        "I'm not a criminal lawyer, I'm a criminal lawyer.",
        "Let's just say I know how to swim in murky legal waters.",
        "It's not illegal fin-ancing, it's just creative accounting!",
        "You're off the hook with me as your attorney!",
        "Better Call Sole!",
    ];

    let randomJoke = $state("");

    function getNewJoke() {
        let newJoke = "";
        if (selectedAttorney.name === "Sole Goodfin") {
            newJoke =
                soleGoodfinJokes[
                    Math.floor(Math.random() * soleGoodfinJokes.length)
                ];
        } else {
            newJoke =
                fishLegalJokes[
                    Math.floor(Math.random() * fishLegalJokes.length)
                ];
        }
        // Make sure we don't get the same joke twice in a row
        if (newJoke === randomJoke && fishLegalJokes.length > 1) {
            return getNewJoke();
        }
        return newJoke;
    }

    onMount(() => {
        randomJoke = getNewJoke();
    });

    let legalHistoryEvents = $state([
        { year: 2010, event: "FishTime founded in a small aquarium" },
        {
            year: 2012,
            event: "Drafted first Terms & Conditions using bubble-writing",
        },
        {
            year: 2015,
            event: "Survived first legal challenge from Poseidon himself",
        },
        {
            year: 2018,
            event: "Expanded legal department to include more aquatic attorneys",
        },
        {
            year: 2023,
            event: "Updated policies to comply with underwater regulations",
        },
    ]);

    function selectAttorney(attorney: LegalTeamMember) {
        selectedAttorney = attorney;
        randomJoke = getNewJoke();
    }
</script>

<div
    class="flex justify-center w-full bg-blue-50/30 dark:bg-gray-900/30 min-h-screen"
>
    <div class="max-w-6xl w-full mx-auto px-4 py-8">
        <Heading tag="h1" class="mb-8 text-center">
            The FishTime Legal Aquarium
        </Heading>

        <div class="w-full flex justify-center mt-6 mb-12">
            <Card class="mb-12" size="xl">
                <div class="flex flex-col md:flex-row items-center gap-8">
                    <div class="w-full md:w-2/3">
                        <Heading tag="h2" class="mb-4"
                            >Meet Our Legal Team</Heading
                        >

                        <div
                            in:fade={{ duration: 200 }}
                            class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6"
                        >
                            <div
                                class="flex flex-col md:flex-row md:items-center gap-4 mb-4"
                            >
                                <Avatar
                                    size="xl"
                                    class="hidden md:block"
                                    src={selectedAttorney.picture}
                                    alt={selectedAttorney.name}
                                />
                                <div>
                                    <Heading tag="h3" class="text-xl font-bold"
                                        >{selectedAttorney.name}</Heading
                                    >
                                    <P
                                        class="text-primary-600 dark:text-primary-400 font-medium"
                                        >{selectedAttorney.title}</P
                                    >
                                    <Badge color="blue" class="mt-1"
                                        >{selectedAttorney.specialty}</Badge
                                    >
                                </div>
                            </div>

                            <P class="my-4">
                                {selectedAttorney.bio ||
                                    "Our attorneys have a combined 127 years of experience in maritime law (mostly spent swimming). We're ready to tackle any legal challenge that washes up on our shores."}
                            </P>
                        </div>

                        <div class="mb-4">
                            <Blockquote
                                class="bg-blue-50 dark:bg-blue-900 border-l-4 border-primary-500 p-4 italic"
                            >
                                <span in:fade={{ duration: 300 }}
                                    >{randomJoke} - {selectedAttorney.name}</span
                                >
                            </Blockquote>
                        </div>

                        <div class="mb-4">
                            <Button
                                color="light"
                                size="sm"
                                onclick={() => (randomJoke = getNewJoke())}
                            >
                                New quote, please!
                            </Button>
                        </div>
                    </div>
                </div>

                <P class="font-semibold mb-4"
                    >Select an attorney to learn more:</P
                >
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {#each legalTeam as attorney}
                        <button
                            class="p-4 border-2 rounded-lg text-center cursor-pointer transition-all hover:bg-blue-50 dark:hover:bg-blue-900
                        {attorney.name === selectedAttorney.name
                                ? 'bg-blue-100 dark:bg-blue-800 border-primary-500 dark:border-primary-500 shadow-md transform scale-[1.02]'
                                : 'border-gray-200 dark:border-gray-700'}"
                            onclick={() => selectAttorney(attorney)}
                        >
                            <P class="font-bold">{attorney.name}</P>
                            <P class="text-sm text-gray-600 dark:text-gray-400"
                                >{attorney.title}</P
                            >
                            <Badge
                                color={attorney.name === selectedAttorney.name
                                    ? "primary"
                                    : "blue"}
                                class="mt-1"
                            >
                                {attorney.specialty}
                            </Badge>
                        </button>
                    {/each}
                </div>

                <P class="mt-8 italic text-sm text-gray-600 dark:text-gray-400">
                    While our legal team consists entirely of fish with law
                    degrees from prestigious underwater universities, they've
                    drafted impressive documentation using bubble-writing and
                    fin-signatures that will hold water in any court.
                </P>
            </Card>
        </div>

        <Heading tag="h2" class="mt-6 mb-6 text-center "
            >Important Legal Documents</Heading
        >

        <div class="w-full flex justify-center">
            <div class="flex flex-col gap-8">
                <Card
                    class="border-l-4 border-primary-600 hover:shadow-lg transition-shadow"
                    size="xl"
                >
                    <Heading tag="h3" class="mb-4 "
                        >Terms and Conditions</Heading
                    >
                    <P class="mb-6">
                        The fine print nobody reads but everyone agrees to. Our
                        T&Cs are at least 20% less boring than most websites,
                        with special clauses about not using FishTime to
                        communicate with actual fish or summon sea monsters.
                    </P>
                    <div class="mt-2 mb-3">
                        <Badge color="dark">LEGALLY BINDING</Badge>
                        <Tooltip>100% legally binding despite the humor</Tooltip
                        >
                    </div>
                    <Button
                        href="/legal/terms-and-conditions"
                        class="mt-4 w-full"
                        >Read our Terms and Conditions</Button
                    >
                </Card>

                <Card
                    class="border-l-4 border-primary-600 hover:shadow-lg transition-shadow"
                    size="xl"
                >
                    <Heading tag="h3" class="mb-4 ">Privacy Policy</Heading>
                    <P class="mb-6">
                        We respect your privacy almost as much as fish respect
                        personal space in a school. Learn how we protect your
                        data from fishing expeditions and data trawlers. We
                        promise not to share your information with actual
                        sharks.
                    </P>
                    <div class="mt-2 mb-3">
                        <Badge color="dark">LEGALLY BINDING</Badge>
                        <Tooltip>
                            You will be fined if you don't read this
                        </Tooltip>
                    </div>
                    <Button href="/legal/privacy-policy" class="mt-4 w-full"
                        >View our Privacy Policy</Button
                    >
                </Card>
                <Card class="mb-8" size="xl">
                    <Heading tag="h3" class="mb-4"
                        >FishTime Legal History</Heading
                    >
                    <Timeline>
                        {#each legalHistoryEvents as event}
                            <TimelineItem title={`${event.year}`}>
                                <p
                                    class="mb-4 text-base font-normal text-gray-600 dark:text-gray-400"
                                >
                                    {event.event}
                                </p>
                            </TimelineItem>
                        {/each}
                    </Timeline>
                </Card>
                <Card
                    class="text-center bg-blue-50 dark:bg-blue-900 border-none"
                    size="xl"
                >
                    <P class="text-sm text-gray-600 dark:text-gray-400">
                        Notwithstanding the facetious nature of the
                        aforementioned content, it should be duly noted that
                        these documents may constitute quasi-juridical
                        instruments which, while not necessarily encompassing
                        enforceable contractual obligations, might potentially
                        be interpreted as governing certain aspects of your
                        engagement with the FishTime platform, pending
                        jurisdictional determination and applicable statutory
                        frameworks. Perusal of said documentation is hereby
                        recommended for parties experiencing a paucity of
                        alternative occupational or recreational endeavors.
                    </P>
                    <P class="text-xs mt-2 text-gray-500 dark:text-gray-500">
                        Ichthyological consultation was procured during the
                        formulation of these pseudo-legal instruments, a
                        methodological approach which, upon comprehensive
                        multi-factorial analysis, may be deemed advantageous
                        vis-à-vis the counterfactual scenario wherein such
                        consultation was not obtained.
                    </P>
                </Card>
            </div>
        </div>
    </div>
</div>
