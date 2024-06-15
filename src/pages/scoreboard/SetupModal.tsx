import { useDisclosure } from "@mantine/hooks"
import { Modal, Button } from "@mantine/core"

export function SetupModal() {
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="This is a fullscreen modal"
                fullScreen
                radius={0}
                transitionProps={{ transition: "fade", duration: 200 }}
            >
                {/* Modal content */}
            </Modal>

            <Button onClick={open}>Setup</Button>
        </>
    )
}
