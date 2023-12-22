CREATE DEFINER=`root`@`localhost` TRIGGER `before_insert_appointment` BEFORE INSERT ON `appointments` FOR EACH ROW BEGIN
    DECLARE admin_id INT;

    -- Selecciona el ID del admin basado en la especialidad de la cita
    SELECT id INTO admin_id FROM users 
    WHERE role = 'admin' AND specialty = NEW.service LIMIT 1;

    -- Si no se encuentra un admin con esa especialidad, pasara a seleccionar un admin disponible independientemente de su especialidad
    IF admin_id IS NULL THEN
        SELECT id INTO admin_id FROM users WHERE role = 'admin' LIMIT 1;
    END IF;

    SET NEW.worker = admin_id;
END