<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";

    let container: HTMLDivElement;

    onMount(() => {
        if (!container) return;

        // Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 3;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Sphere
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Light
        const ambientLight = new THREE.AmbientLight(0x404040); // soft light
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(ambientLight);
        scene.add(pointLight);

        // Animate
        const animate = () => {
            requestAnimationFrame(animate);
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        // Resize
        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener("resize", handleResize);
    });
</script>

<div bind:this={container} class="container" />

<style>
    :global(body) {
        margin: 0;
        overflow: hidden;
    }
    .container {
        width: 100vw;
        height: 100vh;
        display: block;
    }
</style>
