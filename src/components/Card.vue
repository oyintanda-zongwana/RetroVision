<template>
    <div class="card">
        <div class="card-header">
            <slot name="cardHeader"></slot>
        </div>
        <div class="card-body">
            <slot name="cardBody"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardComp"
}
</script>

<style scoped>
.card {
    width: 18rem;
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    margin: 1rem;
}

.card-header {
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    text-align: center;
}

.card-body {
    padding: 1rem;
    flex-grow: 1; 
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
}

.btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-dark {
    background-color: #343a40;
    color: #fff;
}

.btn-dark:hover {
    background-color: #212529;
}
</style>
