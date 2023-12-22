CREATE DEFINER=`root`@`localhost` TRIGGER `before_appointment_update` BEFORE UPDATE ON `appointments` FOR EACH ROW BEGIN
    IF NEW.date < CURDATE() THEN
        SET NEW.is_active = 0;
    END IF;
END