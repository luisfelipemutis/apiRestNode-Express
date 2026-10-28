function userValido(user, users, upDate = false) {
    const errors = [];
    if (!nombreValido(user.name)) {
        errors.push("El nombre debe tener al menos 2 caracteres");
    };
    if (!correoValido(user.email)) {
        errors.push("El correo no es valido");
    }
    if (!idValido(user.id, users, upDate)) {
        errors.push("El id debe ser un numerico y unico");
    }
    return {
        isValid: errors.length === 0,
        errors: errors,
    }
}

function correoValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function nombreValido(nombre) {
    return typeof nombre === 'string' && nombre.length > 3;
}

function idValido(id, users, upDate = false) {
    const isNumber = !isNaN(id);
    const isUnic = !users.some(user => user.id === id);
    return isNumber && (isUnic || upDate);
}

module.exports = {
    correoValido,
    nombreValido,
    idValido,
    userValido,
};