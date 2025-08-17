<script lang="ts">
    import { onMount } from "svelte";
    import {
        Mesh,
        MeshBasicMaterial,
        PerspectiveCamera,
        Scene,
        WebGLRenderer,
        BoxGeometry
    } from "three";

    let container: HTMLDivElement;

    onMount(() => {
        const scene = new Scene();

        const fov = 35;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 0.1;
        const far = 100;
        const camera = new PerspectiveCamera(fov, aspect, near, far);

        camera.position.set(0, 0, 10);

        const geometry = new BoxGeometry(2, 2, 2);

        const material = new MeshBasicMaterial();

        const cube = new Mesh(geometry, material);

        scene.add(cube);

        const renderer = new WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        container.appendChild(renderer.domElement);
        renderer.render(scene, camera);
    });
</script>

<div bind:this={container} class="h-full w-full"></div>
