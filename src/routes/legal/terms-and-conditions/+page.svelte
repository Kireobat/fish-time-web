<script lang="ts">
    import { Card, Heading, P } from "flowbite-svelte";
</script>

<div class="flex justify-center w-full">
    <Card class="my-8 max-w-3xl">
        <Heading tag="h1" class="mb-6 text-center">Terms and Conditions</Heading
        >

        <Heading tag="h2" class="mt-6 mb-2">Not a Serious Website</Heading>
        <P class="mb-4">
            Welcome to our website! Please be aware that this is NOT a serious
            website. This site is intended for demonstration, entertainment, or
            testing purposes only. Any resemblance to a real, functional service
            is purely coincidental.
        </P>

        <Heading tag="h2" class="mt-6 mb-2"
            >Don't Share Important Information</Heading
        >
        <P class="mb-4">
            Please DO NOT share any important, sensitive, or personal
            information on this website. This includes but is not limited to:
            real passwords you use elsewhere, financial information, personal
            identification details, or any data you wouldn't feel comfortable
            having posted on a billboard.
        </P>

        <Heading tag="h2" class="mt-6 mb-2">No Responsibility</Heading>
        <P class="mb-4">
            We take absolutely no responsibility for anything that happens as a
            result of using this website. This includes, but is not limited to:
            data loss, emotional distress from bad UI design, existential crises
            caused by error messages, or any fish-related incidents that may
            occur.
        </P>

        <Heading tag="h2" class="mt-6 mb-2">Data Security</Heading>
        <P class="mb-4">
            Any data you enter might be stored in a digital shoebox, written on
            a napkin, or whispered to passing clouds. We make no guarantees
            about security, privacy, or data retention. In fact, we're probably
            going to lose your data anyway, so don't get too attached to it.
        </P>

        <Heading tag="h2" class="mt-6 mb-2">Agreement</Heading>
        <P class="mb-4">
            By using this website, you agree to these terms and acknowledge that
            you are using a non-serious website for non-serious purposes. If
            you're looking for a serious service, you might want to look
            elsewhere. Perhaps try a website with fewer fish puns.
        </P>

        <P class="mt-8 text-sm text-center text-gray-500">
            Last updated: Sometime between the dinosaurs and the robot uprising
        </P>
    </Card>
</div>
